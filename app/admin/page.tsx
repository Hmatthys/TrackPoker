
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { submit } from './actions'










export default async function Player() {


  

  
  
      
  





  return (
    <div style={{ width: '100%', margin: '0 auto'}}>

      
          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
            <form>
              <label>Game date:</label>
              <input id="date" name="date" type="number" required/>
              <label>Game location:</label>
              <input id="location" name="location" type="string" required/>
              <button formAction={submit}>Submit</button>

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
