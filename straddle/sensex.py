from backtestTools.algoLogic import optOverNightAlgoLogic
from backtestTools.histData import getFnoBacktestData
from backtestTools.expiry import getExpiryData
from datetime import datetime, time
import csv
import os

class algoLogic(optOverNightAlgoLogic):

    def run(self, startDate, endDate, baseSym, indexSym):

        col = ["Target", "Stoploss", "Expiry"]
        self.addColumnsToOpenPnlDf(col)

        startEpoch = startDate.timestamp()
        endEpoch = endDate.timestamp()

        try:
            df = getFnoBacktestData(indexSym, startEpoch, endEpoch, "1Min")
        except Exception as e:
            self.strategyLogger.info(f"Data not found for {baseSym} in range {startDate} to {endDate}")
            raise Exception(e)

        df.dropna(inplace=True)
        df.to_csv(f"{self.fileDir['backtestResultsCandleData']}{indexName}_1Min.csv")

        lastIndexTimeData = [0, 0]
        Currentexpiry = getExpiryData(startEpoch, baseSym)['CurrentExpiry']
        expiryDatetime = datetime.strptime(Currentexpiry, "%d%b%y").replace(hour=15, minute=20)

        for timeData in df.index: 

            self.timeData = float(timeData)
            self.humanTime = datetime.fromtimestamp(timeData)
            print(self.humanTime)

            if (self.humanTime.time() < time(9, 16)) | (self.humanTime.time() > time(15, 30)):
                continue

            lastIndexTimeData.pop(0)
            lastIndexTimeData.append(timeData-60)

            # if (self.humanTime.time() < time(9, 16)) | (self.humanTime.time() > time(15, 25)):
            #     continue

            if self.humanTime.date() > expiryDatetime.date():
                Currentexpiry = getExpiryData(self.timeData + 86400, baseSym)['CurrentExpiry']
                expiryDatetime = datetime.strptime(Currentexpiry, "%d%b%y").replace(hour=15, minute=20)
                expiryEpoch = expiryDatetime.timestamp()

            if lastIndexTimeData[1] in df.index:
                try:
                    underlying_price = df.at[lastIndexTimeData[1], "c"]

                    call_sym = self.getCallSym(self.timeData, baseSym, underlying_price, Currentexpiry)
                    put_sym = self.getPutSym(self.timeData, baseSym, underlying_price, Currentexpiry)

                    data_call = self.fetchAndCacheFnoHistData(call_sym, lastIndexTimeData[1])
                    data_put = self.fetchAndCacheFnoHistData(put_sym, lastIndexTimeData[1])

                    data_dir = 'NIFTY'
                    os.makedirs(data_dir, exist_ok=True)

                    file_date = self.humanTime.date().isoformat()
                    csv_file = os.path.join(data_dir, f"{file_date}.csv")

                    file_exists = os.path.isfile(csv_file)
                    straddle_value = data_call['c'] + data_put['c']

                    with open(csv_file, mode='a', newline='') as file:
                        writer = csv.writer(file)

                        if not file_exists:
                            writer.writerow(['datetime', 'call_sym', 'put_sym', 'data_call', 'data_put', 'straddleValue'])

                        writer.writerow([self.humanTime, call_sym, put_sym, data_call['c'], data_put['c'], round(straddle_value, 2)])

                except Exception as e:
                    self.strategyLogger.info(f"{self.humanTime} Exception occurred: {e}")
        self.pnlCalculator()
        self.combinePnlCsv()

        return self.closedPnl, self.fileDir["backtestResultsStrategyUid"]

if __name__ == "__main__":
    startTime = datetime.now()

    devName = "AM"
    strategyName = "HistoricalDataStraddle"
    version = " "

    startDate = datetime(2025, 5, 31, 9, 15)
    endDate = datetime(2025, 8, 31, 15, 30)

    algo = algoLogic(devName, strategyName, version)

    # baseSym = "BANKNIFTY"
    # indexName = "NIFTY BANK"

    baseSym = "SENSEX"
    indexName = "SENSEX"

    # baseSym = "NIFTY"
    # indexName = "NIFTY 50"
    
    closedPnl, fileDir = algo.run(startDate, endDate, baseSym, indexName)

    endTime = datetime.now()
    print(f"Done. Ended in {endTime-startTime}")