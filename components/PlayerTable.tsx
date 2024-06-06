
import { createClient } from "@/utils/supabase/server";

import Link from 'next/link';
import React from 'react';
import Player from "@/app/players/[playerid]/page";



export default async function Index() {

  const supabase = createClient();
 
  const { data: player } = await supabase.from('orderedresults').select('playerid, name, number_of_sessions, profit');
  if(!player){
    return <p>No players</p>
  }

      return (     
    <div style={{  padding: '10px', margin: '15px', width: '100%', fontSize: '1.2em', backgroundColor: '#202c34', borderRadius: '16px' }}>
    
    <table style={{    width: '100%' }}>
        <tr>
        <th style = {{textAlign: 'left', width: '70%', borderBottom: '1px', borderColor: 'white'}}>Player</th>
        <th style = {{textAlign: 'center'}}>Profit</th> 
        <th style = {{textAlign: 'center'}}>Games Played</th>
        </tr>
            {player.map((player) => (
            <tr key={player.playerid} style= {{borderBottom: '1px', borderColor: 'white'}}>
            <td style = {{borderBottom: '1px', borderColor: 'white'}}><Link href={`/players/${player.playerid}`}>{player.name}</Link></td>
            <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{player.profit}</td>
            <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{player.number_of_sessions}</td>
            </tr>))} 
        
        </table>  
    </div>
               

              
      );
}
      