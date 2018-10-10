Clear-Host

$pointsFromArray = 'Москва','Ростов-на-Дону','Батайск','Абаза','Арзамас','Белозерск','Беслан','Буйнакск'
$pointsToArray = 'Краснодар','Азов','Кемерово','Абакан','Аксай','Барнаул','Волжск'



foreach ($pointFrom in $pointsFromArray){

    foreach ($pointTo in $pointsToArray){
    
    
    $res = Invoke-WebRequest -Uri ('http://localhost:3000/route?from='+$pointFrom+'&'+'to='+$pointTo)
    Write-Host $res.Content
    
    }

}