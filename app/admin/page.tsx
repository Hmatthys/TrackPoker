
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { submitGame } from './actions'










export default async function Player() {


  

  
  
      
  





  return (
    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>

      
          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
            <form>
              <p><label>Game date:</label></p>
              <input id="date" name="date" type="number" style={{color: 'black'}} required/>
              <p><label>Game location:</label></p>
              <input id="location" name="location" type="text" style={{color: 'black'}} required/>
              <p><label>Player 1</label></p>
              <input id="p1" name="p1" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p1profit" name="p1profit" type ="number" style={{color: 'black'}}/>
              <p><button formAction={submitGame}>Submit</button></p>

            </form>
          </div>
        
        <div style = {{  width: '100%' }}>
          <p style = {{ textAlign: 'center' }}>
            <u><a href={'/..'}>Home</a></u>
           
          </p>
          
        </div>
        
      </div>
    
  );
}
