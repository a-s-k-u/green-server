function setTags ([ref]$tagNameList, $count, [ref]$tagArray){ #recursive function to get field counts.
   $tagName = ($tagNameList.Value)[$count]
   $isTagPresent = $false;
   ($tagArray.Value) | foreach-object {
       if ($_.TeamName -eq $tagName){
          $_.Count += 1;
          $isTagPresent = $true;
       }
   }
   if ($isTagPresent -eq $false){
      $obj = New-Object psobject -Property @{
                TeamName = $tagName
                Count    = 1
                }
        ($tagArray.Value).Add($obj);
   }
   $count++;
   if ($count -lt ($tagNameList.Value).Count){
      setTags (([ref]$tagNameList).Value) $count (([ref]$tagArray).Value)
   }
}

$tagArray = New-Object System.Collections.Generic.List[System.Object]
<#
$obj = New-Object psobject -Property @{
                TeamName = 'Hello'
                Count    = 1
                }
$tagArray.Add($obj);
#>
$tagNameList = 'Jade', 'Informatica', 'Dotnet', 'Jade';
$tagNameList.Count
$tagNameList[2]
setTags ([ref]$tagNameList) 0 ([ref]$tagArray)
$tagArray

