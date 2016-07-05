function getIdeas
{
$dataPath = [io.path]::combine($global:rootFolder,'PresentationView\ADM1Digithonideas.csv')
$a = Import-Csv -Path $dataPath | ConvertTo-Json
return $a
}
function getSlides
{
$slidesPath = [io.path]::combine($global:rootFolder,'PresentationView\Slides.csv')
$a = Import-Csv -Path $slidesPath | ConvertTo-Json
return $a
}
