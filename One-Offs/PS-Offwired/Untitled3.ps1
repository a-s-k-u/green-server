$StartDate=(GET-DATE)
$EndDate=[datetime]”04/21/2017”
$timespan = NEW-TIMESPAN –Start $StartDate –End $EndDate
$timespan.TotalDays