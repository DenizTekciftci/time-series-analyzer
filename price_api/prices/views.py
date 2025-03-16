from django.http import JsonResponse
from datetime import datetime
from prices.models import HistoricalPrice, Ticker
from collections import defaultdict
import pandas as pd
from django.http import HttpResponse

def load(request):
    df = pd.read_json("input_data.json")
    
    # Load tickers
    tickers = [Ticker(ticker="Inst1"), Ticker(ticker="Inst2")]
    for x in tickers:
        try:
            x.save()
        except Exception as e:
            print(e)
    
    inst1 = df["Inst1"]
    inst2 = df["Inst2"]

    inst1_historic = [HistoricalPrice(ticker = "Inst1", price = x["price"], date=x["date"]) for x in inst1]
    inst2_historic = [HistoricalPrice(ticker = "Inst2", price = x["price"], date=x["date"]) for x in inst2]

    for x in inst1_historic:
        try:
            x.save()
        except Exception as e:
            print(e)
            
    for x in inst2_historic:
        try:
            x.save()
        except Exception as e:
            print(e)
    
    return HttpResponse(status=200)

def tickers(request):
    data = [t["ticker"] for t in list(Ticker.objects.values("ticker"))]
    
    return JsonResponse(data, safe=False)

def prices(request):
    # Get query parameters from URL
    tickers = request.GET.get("tickers")
    start_date = request.GET.get("startDate")
    end_date = request.GET.get("endDate")
    order = request.GET.get("order")

    if not tickers:
        return JsonResponse({"error": "At least one ticker is required"}, status=400)

    ticker_list = tickers.split(",")
    
    try:
        if start_date:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        if end_date:
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
    except ValueError:
        return JsonResponse({"error": "Invalid date format. Use YYYY-MM-DD"}, status=400)

    # Query the database
    orderColumn = "date"
    if order == "D":
        orderColumn = "-" + orderColumn
        
    query = HistoricalPrice.objects.order_by(orderColumn).filter(ticker__in=ticker_list)
    
    if start_date:
        query = query.filter(date__gte=start_date)
    if end_date:
        query = query.filter(date__lte=end_date)

    grouped_data = defaultdict(list)
    
    for record in query.values("date", "ticker", "price"):
        ticker = record["ticker"]
        grouped_data[ticker].append(
            {
                "date": record["date"],
                "price": record["price"]
            }
        )
    
    return JsonResponse(grouped_data)