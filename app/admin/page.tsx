
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
              <p><label>Player 1          </label></p>
              <input id="p1" name="p1" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p1profit" name="p1profit" type ="number" style={{margin: '12px', color: 'black'}}/>
              <p><label>Player 2</label></p>
              <input id="p2" name="p2" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p2profit" name="p2profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 3</label></p>
              <input id="p3" name="p3" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p3profit" name="p3profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 4</label></p>
              <input id="p4" name="p4" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p4profit" name="p4profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 5</label></p>
              <input id="p5" name="p5" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p5profit" name="p5profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 6</label></p>
              <input id="p6" name="p6" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p6profit" name="p6profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 7</label></p>
              <input id="p7" name="p7" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p7profit" name="p7profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 8</label></p>
              <input id="p8" name="p8" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p8profit" name="p8profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 9</label></p>
              <input id="p9" name="p9" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p9profit" name="p9profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 10</label></p>
              <input id="p10" name="p10" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p10profit" name="p10profit" type ="number" style={{color: 'black'}}/>
              <p><label>Player 11</label></p>
              <input id="p11" name="p11" type="number" style={{color: 'black', width: '50%'}}/>
              <input id="p11profit" name="p11profit" type ="number" style={{color: 'black'}}/>

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
