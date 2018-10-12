Clear-Host

$pointsFromArray = '55.811511,37.312518','Ростов-на-Дону','Батайск','Абаза','Арзамас','Белозерск','Беслан','Буйнакск'
$pointsToArray = 'Краснодар','Азов','Кемерово','Абакан','Аксай','Барнаул','Волжск'

Write-Host 'Start load test'

foreach ($pointFrom in $pointsFromArray){

    foreach ($pointTo in $pointsToArray){

        $res = Invoke-WebRequest -Uri ('http://localhost:8080/route?waypoints=' + $pointFrom + '|' + $pointTo)
        Write-Host $res.Content
    
    }

}

Write-Host 'End load test'