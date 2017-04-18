 $teamFolder = 'C:\Users\arun-\Documents\GitHub\green-server\One-Offs\PS-Offwired\Data\Team'
$workItemsPath = [io.path]::combine($teamFolder,'BAU-WorkItems.csv');
    $workItems = Import-Csv -Path $workItemsPath
    $workItems
    $nextWorkItemId = $workItems.length + 1
    $nextWorkItemId