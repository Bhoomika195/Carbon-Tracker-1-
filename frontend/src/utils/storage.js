const KEY = 'carbon_tracker_history_v1'

const SETTINGS_KEY = 'carbon_tracker_settings_v1'

export function loadHistory(){
  try{
    const raw = localStorage.getItem(KEY)
    if(!raw) return []
    return JSON.parse(raw)
  }catch(e){
    return []
  }
}

export function saveHistory(history){
  try{ localStorage.setItem(KEY, JSON.stringify(history)) }catch(e){}
}

export function loadSettings(){
  try{ const raw = localStorage.getItem(SETTINGS_KEY); return raw ? JSON.parse(raw) : {} }catch(e){ return {} }
}

export function saveSettings(settings){
  try{ localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)) }catch(e){}
}
