export function calcTrip({ mode='car', km=0, vehicle='petrol', flightClass='economy', longHaul=false }){
  // Simple emission factors in kg CO2 per km
  const factors = {
    car: { petrol: 0.192, diesel: 0.171, ev: 0.053 },
    train: 0.041,
    flight: 0.255 // average per passenger-km (base, economy)
  }

  if(mode==='car'){
    const f = factors.car[vehicle] || factors.car.petrol
    return km * f
  }
  if(mode==='train') return km * factors.train
  if(mode==='flight'){
    // apply class and long-haul multipliers
    const base = factors.flight
    const classMultiplier = flightClass === 'business' ? 2.0 : (flightClass === 'first' ? 3.0 : 1.0)
    const longHaulMultiplier = longHaul ? 1.1 : 1.0
    return km * base * classMultiplier * longHaulMultiplier
  }
  return 0
}

export function calcEnergy(kwh=0){
  // kg CO2 per kWh (global average approx) — adjust for your country
  const factor = 0.233
  return kwh * factor
}

export function calcDiet({ diet='omnivore', mealsPerDay=1 }){
  // Rough average kg CO2 per meal — simplified for demo purposes
  const perMeal = {
    omnivore: 5.0,
    vegetarian: 2.5,
    vegan: 1.8
  }
  const m = perMeal[diet] || perMeal.omnivore
  // return monthly estimate (mealsPerDay * 30 days)
  return m * mealsPerDay * 30
}

export function calcWaste(kgPerMonth=0){
  // kg CO2 per kg of municipal solid waste (approx)
  const factor = 0.21
  return kgPerMonth * factor
}

export function sumHistory(history=[]){
  return history.reduce((s,it)=>s + (it.co2||0), 0)
}
