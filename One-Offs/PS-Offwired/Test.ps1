#Get-Process | group company

$currentDirectory = split-path -parent $MyInvocation.MyCommand.Definition
$userDetailsPath = [io.path]::combine($currentDirectory,'Data\Party\UserIDList.csv');

$parties = Import-Csv -Path $userDetailsPath | group Team

$collectionWithItems = @()

$parties | foreach-object {
   $collectionWithItems += New-Object psobject -Property @{
            TeamName = $_.Values[0]
            Count    = $_.Count
            }
}

$collectionWithItems