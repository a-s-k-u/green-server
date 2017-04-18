$teamFolder = 'C:\Users\arun-\Documents\GitHub\green-server\One-Offs\PS-Offwired\Data\Team'
    $files = Get-ChildItem -Path $teamFolder
    $collectionWithItems = New-Object System.Collections.Generic.List[System.Object]

    $files | foreach-object {
         # handle individual Project files.
         $filePath = [io.path]::combine($teamFolder,$_.Name)
         $workItems = Import-Csv -Path $filePath
         $projectSummary =  $workItems | Where-Object {$_.DataType -eq 'A'}
         $collectionWithItems.Add($projectSummary);

     }#fileList
     $collectionWithItems