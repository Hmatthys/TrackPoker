
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { submitGame } from './actions'










export default async function Player() {


  

  
  
      
  





  return (
    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>

      
          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
            <form>
              <p><label>Game date:</label></p>
              <input id="date" name="date" type="number" required/>
              <p><label>Game location:</label></p>
              <input id="location" name="location" type="string" required/>
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
