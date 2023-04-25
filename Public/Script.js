// -----JS CODE-----

//@input Component.Text lokacija
//@input Component.Text temperatura
//@input Component.Text tvojalokacija
//@input Component.Image sunny
//@input Component.Image night
//@input Component.Image cloudy
//@input Component.Image snow
//@input Component.Image rain
//@input Component.Image windy
//@input Component.Image umbrellaon
//@input Component.Image umbrellaoff
//@input Component.Image umbrellamid

//@input SceneObject glasses
//@input Component.BaseMeshVisual tshirt
//@input Component.BaseMeshVisual duksa
//@input Component.BaseMeshVisual jaketa
//@input Asset.Material[] materials
//@input Component.ScriptComponent accuweatherAPI

script.sunny.enabled=false;
script.night.enabled=false;
script.cloudy.enabled=false;
script.snow.enabled=false;
script.rain.enabled=false;
script.windy.enabled=false;
script.umbrellaon.enabled=false;
script.umbrellaoff.enabled=false;
script.umbrellamid.enabled=false;

script.glasses.enabled=false;


function chooselogo(condition){
    if(condition=="SUNNY" || condition=="HOT"){
    
        script.sunny.enabled=true;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
    }   
    else if(condition=="CLEAR_NIGHT" || condition=="PARTIAL_CLOUDY_NIGHT"){
                
        script.sunny.enabled=false;
        script.night.enabled=true;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
    }  
    else if(condition=="CLOUDY" || condition=="PARTIAL_CLOUDY"){
        
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=true;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
    }
    else if(condition=="SNOW" || condition=="HAIL"){
        
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=true;
        script.rain.enabled=false;
        script.windy.enabled=false;
    }  
    else if(condition=="WINDY"){
        
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=true;
    }  
    else if(condition=="RAINY"){
        
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=true;
        script.windy.enabled=false;
    }
    
}


var getWeatherT = function(LAT,LON,callback) {
    script.accuweatherAPI.api.getCurrentCondition(LAT, LON, function(err, parsedBody) {
        if (err) {
            callback(err);
        } else {
            var tempTemp = parseInt(parsedBody.currentCondition.temperatureF);
            var tempCelsius = Math.round((tempTemp - 32) / 1.8).toString();
            var conditionon = parsedBody.currentCondition.condition;
            callback(null, tempCelsius,conditionon);
        }
    });
};
getWeatherT("34.024212","-118.496475",function(err, tempCelsius, vrijeme) {
        print("Temperature in Celsius: " + tempCelsius);
        print(vrijeme);
});


function umbrella(condition){
    if(condition=="RAINY"){
     script.umbrellaon.enabled=true;
script.umbrellaoff.enabled=false;
script.umbrellamid.enabled=false;
    }
    else if(condition=="CLOUDY"){
        script.umbrellaon.enabled=false;
script.umbrellaoff.enabled=false;
script.umbrellamid.enabled=true;
    }
    
    else{
        script.umbrellaon.enabled=false;
script.umbrellaoff.enabled=true;
script.umbrellamid.enabled=false;
    }
}

function sunglasses(condition){
    if(condition=="SUNNY"){
        script.glasses.enabled=true;
    }
    else{
         script.glasses.enabled=false;
    }
}

function whattowear(temperatureInt){
        if(temperatureInt>=20){
        print("toplo");
        script.duksa.enabled=false;
        script.tshirt.enabled=true;
        script.jaketa.enabled=false;
    }
    else if(20>temperatureInt & temperatureInt>10){
        print("onako");
        script.duksa.enabled=true;
        script.tshirt.enabled=false;
        script.jaketa.enabled=false;
    }
     else   if(10>=temperatureInt){
        print("jaketa");
        script.duksa.enabled=false;
        script.tshirt.enabled=false;
        script.jaketa.enabled=true;
        
    }
    
}



function setMaterial(material){
    script.tshirt.clearMaterials();
    script.tshirt.addMaterial(material);
    script.duksa.clearMaterials();
    script.duksa.addMaterial(material);
        script.jaketa.clearMaterials();
    script.jaketa.addMaterial(material);
}


//-------------------lokalno vrijeme---------------------
//-----------Weather-----------------

a=1;

            
    global.userContextSystem.requestWeatherLocalized(function(weatherText) {
    return weatherText;
});


//____________________________________________ first frame
var userContextSystem = global.userContextSystem;

userContextSystem.requestWeatherCondition(function(weather) {
    if (weather == WeatherCondition.Rainy || weather==WeatherCondition.Lightning) {
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=true;
        script.windy.enabled=false;
        script.umbrellaon.enabled=true;
        script.umbrellamid.enabled=false;
        script.umbrellaoff.enabled=false;

        script.glasses.enabled=false;
    }
    else if (weather == WeatherCondition.ClearNight) {
                script.sunny.enabled=false;
        script.night.enabled=true;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;

                    script.glasses.enabled=false;
    }
        else if (weather == WeatherCondition.Snow) {
                script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=true;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;

                    script.glasses.enabled=false;
    }
    else if (weather == WeatherCondition.Windy) {
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=true;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;

                    script.glasses.enabled=false;
    }
    else if (weather == WeatherCondition.Sunny) {
            
        script.sunny.enabled=true;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;

                    script.glasses.enabled=true;
    }
    else{
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=true;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=true;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=false;
                    script.glasses.enabled=false;
    }

                
});
   global.userContextSystem.requestTemperatureCelsius(function(temp) {
                script.temperatura.text=Math.round(temp)+" °C"
    whattowear(temp);
    setMaterial(script.materials[0])
});


//______________________________________________________



function onTapped(eventData)
{



    position=eventData.getTapPosition().x;
        if(eventData.getTapPosition().x>0.5){
      a=a+1;  
    }
    
        else if(eventData.getTapPosition().x<0.5){
     a=a-1;  
    }
    switch(a){
        
   // -------------Location-------------
        case 1:{ 
            
        script.lokacija.size=0;
        script.tvojalokacija.size=120;  
                        
   global.userContextSystem.requestTemperatureCelsius(function(temp) {
                script.temperatura.text=Math.round(temp)+" °C"
                whattowear(temp);
});

userContextSystem.requestWeatherCondition(function(weather) {
    if (weather == WeatherCondition.Rainy || weather==WeatherCondition.Lightning) {
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=true;
        script.windy.enabled=false;
        script.umbrellaon.enabled=true;
        script.umbrellamid.enabled=false;
        script.umbrellaoff.enabled=false;

                    script.glasses.enabled=false;
    }
    else if (weather == WeatherCondition.ClearNight) {
                script.sunny.enabled=false;
        script.night.enabled=true;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;


                    script.glasses.enabled=false;
    }
        else if (weather == WeatherCondition.Snow) {
                script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=true;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;

                    script.glasses.enabled=false;
    }
    else if (weather == WeatherCondition.Windy) {
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=true;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;

                    script.glasses.enabled=false;
    }
    else if (weather == WeatherCondition.Sunny) {
            
        script.sunny.enabled=true;
        script.night.enabled=false;
        script.cloudy.enabled=false;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=false;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=true;

                    script.glasses.enabled=true;
    }
    else{
        script.sunny.enabled=false;
        script.night.enabled=false;
        script.cloudy.enabled=true;
        script.snow.enabled=false;
        script.rain.enabled=false;
        script.windy.enabled=false;
        script.umbrellamid.enabled=true;
        script.umbrellaon.enabled=false;
        script.umbrellaoff.enabled=false;

                    script.glasses.enabled=false;
    }
setMaterial(script.materials[0])
                
});

            break;
            
        }
  // -------------London-------------
        case 2:{
            script.lokacija.size=120;
            script.lokacija.text="London";
            script.tvojalokacija.size=0;

            
 getWeatherT("51.507351","-0.127758",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[1])
                
                
});
            

            break;
        }
        
  // -------------Paris-------------
        case 3:{
             script.lokacija.text="Paris";
            script.tvojalokacija.size=0;
            
             getWeatherT("48.864716","2.349014",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[2])
                
                
});
            break;
        }
        
        
// -------------Zagreb-------------
        case 4:{
             script.lokacija.text="Zagreb";
            script.tvojalokacija.size=0;
    
           
                         getWeatherT("45.815399","15.966568",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[3])
                
                
});
            
            break;
        
        }
        
// -------------Rome-------------
        case 5:{
             script.lokacija.text="Rome";
            script.tvojalokacija.size=0;

            
                         getWeatherT("41.902782","12.496365",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[4])
                
                
});
            
            break;
// -------------Tokyo-------------
        }
        case 6:{
             script.lokacija.text="Tokyo";
            script.tvojalokacija.size=0;

            
                         getWeatherT("35.689487","139.691711",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[5])
                
                
});
            break;
        }
// -------------Cairo-------------
        case 7:{
             script.lokacija.text="Cairo";
            script.tvojalokacija.size=0;

                         getWeatherT("30.044420","31.235712",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[6])
                
                
});
            break;
        }
// -------------New York-------------
        case 8:{
             script.lokacija.text="New York";
            script.tvojalokacija.size=0;

                         getWeatherT("40.712776","-74.005974",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[7])
                
                
});
            break;
        }
// -------------Los Angeles-------------
        case 9:{
             script.lokacija.text="Los Angeles";
    

                         getWeatherT("34.052235","-118.243683",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[8])
                
                
});
            break;
        }
// -------------Sydney-------------
        case 10:{
             script.lokacija.text="Sydney";

                         getWeatherT("-33.865143","151.209900",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[9])
                
                
});
            break;
        }
// -------------Rio de Janeiro-------------
        case 11:{
             script.lokacija.text="Rio de Janeiro";
          //  script.tvojalokacija.size=0;

                         getWeatherT("-22.9032","-43.1729",function(err, tempCelsius, vrijeme) {
                      script.temperatura.text=tempCelsius+" °C"
    chooselogo(vrijeme);
    umbrella(vrijeme);
                sunglasses(vrijeme);
                whattowear(tempCelsius);
                setMaterial(script.materials[10])
                
                
});
            a=0;
            break;
        }
        default:{
            a=1;
        }
    }
    print(a);


        if(a==12){
        a=1;
    }

 
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);



