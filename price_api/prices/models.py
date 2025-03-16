from django.db import models

class HistoricalPrice(models.Model):
    ticker = models.CharField(max_length=10)
    price = models.DecimalField(null=False, decimal_places=2, max_digits=10)
    date = models.DateField(null=False)
  
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['ticker', 'price', 'date'], name='unique_ticker_price_date')
        ]
        
        
class Ticker(models.Model):
    ticker = models.CharField(max_length=10)
  
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['ticker'], name='unique_ticker')
        ]