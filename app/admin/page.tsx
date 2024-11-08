
import { createClient } from "@/utils/supabase/server";
import React, { useEffect, useState } from 'react';
import { submitGame } from './actions'










export default async function Player() {

  const supabase = createClient();
  
  const {data: players} = await supabase.from('player').select('*')
  
  
      
  





  return (
    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>

      
          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
            <form>
              <p><label>Game date:</label></p>
              <input id="date" name="date" type="number" style={{color: 'black'}} required/>

              <p><label>Game location:</label></p>
              <input id="location" name="location" type="text" style={{color: 'black'}} required/>

              <p><label>Player 1 (id), (profit)</label></p>
              <select id="p1" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p1profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 2 (id), (profit)</label></p>
              <select id="p2" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p2profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 3 (id), (profit)</label></p>
              <select id="p3" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p3profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 4 (id), (profit)</label></p>
              <select id="p4" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p4profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 5 (id), (profit)</label></p>
              <select id="p5" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p5profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 6 (id), (profit)</label></p>
              <select id="p6" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p6profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 7 (id), (profit)</label></p>
              <select id="p7" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p7profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 8 (id), (profit)</label></p>
              <select id="p8" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p8profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 9 (id), (profit)</label></p>
              <select id="p9" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p9profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 10 (id), (profit)</label></p>
              <select id="p10" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p10profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>

              <p><label>Player 11 (id), (profit)</label></p>
              <select id="p11" name="id" style={{color: 'black', width: '40%'}}>
                {players?.map((player)=>
                <option value={player.playerid}>{player.name}</option>
                )}
              </select>
              <input id="p11profit" name="profit" type ="number" style={{margin: '12px', width: '40%', color: 'black'}}/>


              <p><button formAction={submitGame} style={{backgroundColor: 'white', color: 'black', textAlign: 'center' }}>Submit</button></p>

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
