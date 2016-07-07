function getIdeas
{
$dataPath = [io.path]::combine($global:projectFolder,'DataFolder\ideas.csv')
$a = Import-Csv -Path $dataPath | ConvertTo-Json
return $a
}
function getSlides
{
$slidesPath = [io.path]::combine($global:projectFolder,'DataFolder\Slides.csv')
$a = Import-Csv -Path $slidesPath | ConvertTo-Json
return $a
}
