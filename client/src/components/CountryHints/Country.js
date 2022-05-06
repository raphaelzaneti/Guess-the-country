export class Country {
    country;
    city;
    continent;
    costline;
    currency_name;
    tld;
    elevation;
    government;
    independence;
    landlocked;
    languages;
    expectancy;
    population;
    religion;
    area;
    abbreviation;

    setCountry(country){
        if(country === undefined || country === null){
            this.country = "None"    
        } else{
            this.country = country
        }
    };
    setCapital(capital){
        if(capital === undefined || capital === null){
            this.capital = "None"    
        } else{
            this.capital = capital
        }
    };

    setContinent(continent){
        if(continent === undefined || continent === null){
            this.continent = "None"    
        } else{
            this.continent = continent
        }
    };

    setCostline(area){
        if(area === undefined || area === null){
            this.costline = 0    
        } else{
            this.costline = area
        }
    };
    
    setCurrency(currency){
        if(currency === undefined || currency === null){
            this.currency = "None"    
        } else{
            this.currency = currency
        }
    };
    
    setDomain(tld){
        if(tld === undefined || tld === null){
            this.tld = "None"    
        } else{
            this.tld = tld
        }
    };
    
    setElevation(elevation){
        if(elevation === undefined || elevation === null){
            this.elevation = "None"    
        } else{
            this.elevation = Intl.NumberFormat().format(elevation) + " m"
        }
    };

    setGovernment(government){
        if(government === undefined || government === null){
            this.government = "None"    
        } else{
            this.government = government
        }
    };
    
    setIndependence(date){
        if(date === undefined || date === null){
            this.independence = "None"    
        } else{
            this.independence = date
        }
    };    
    
    setLandlocked(info){
        if(info===0){this.landlocked = "No"} 
        if(info===1){this.landlocked = "Yes"}
    };

    setLanguages(languages){
        
        if(languages===null || languages===undefined){
            this.languages = "None"
        } else if(languages===String){
            this.languages=languages
        } else {
            this.languages = languages.join(", ")
        }
    };
 
    setExpectancy(expectancy){
        if(expectancy === undefined || expectancy === null){
            this.expectancy = "None"    
        } else{
            this.expectancy = expectancy + " years"
        }
    };
 
    setPopulation(population){
        if(population === undefined || population === null){
            this.population = "None"    
        } else{
            this.population = Intl.NumberFormat().format(population)
        }
    };
 
    setReligion(religion){
        if(religion === undefined || religion === null){
            this.religion = "None"    
        } else{
            this.religion = religion
        }
    };
 
    setArea(area){
        if(area === undefined || area === null){
            this.area = "None"    
        } else{
            this.area = Intl.NumberFormat().format(area)+" km²"
        }
    };

    setAbbreviation(abbr){
        if(abbr === undefined || abbr === null){
            this.abbr = "None"    
        } else{
            this.abbr = abbr.toLowerCase()
        }
    };
}