
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
  const {data: game, error: gameerror, count: numgames} = await supabase
        .from('game')
        .select('*', {count: 'exact', head: true})
        if(gameerror){
            return <p>Count error</p>
        }
  const {data: d, error: playererror, count: numplayers} = await supabase
      .from('player')
      .select('*', {count: 'exact', head: true})
      if(playererror){
          return <p>Count error</p>
      }
      if(!numplayers){
        return <p>Count error</p>
      }
  const { data: lastGame } = await supabase
    .from('sessions')
    .select('player, game, profit')
    .eq('game', numgames);

  if(!lastGame){
    return <p>Last game error</p>
  }
    
    
    let currentPlace =  new Array<[number, number, number]>(numplayers);
    let count = 1;
    let playerData = new Array<[number, string, number, number, number]>;
    player.map((e) => {
        playerData.push([e.playerid, e.name, e.number_of_sessions, e.profit, count]);
        currentPlace[e.playerid - 1][0] = count;
        // currentPlace[e.playerid - 1][2] = e.profit;
        // count += 1;
    })
    
    // lastGame.map((e) => 
    //   currentPlace[e.player - 1][2] -= e.profit
    // )
    // currentPlace.sort((a, b) => b[2] - a[2])
    // count = 0
    // currentPlace.map((e) => {
    //     currentPlace[count][1] = count + 1;
    //     count += 1;
    // })
    let updatedPlace =  new Array<number>(numplayers)
    // count = 0
    // currentPlace.map((e) => 
    //   updatedPlace[e[0] - 1] = e[0] - e[1] 
    // )
      return (     
    <div style={{  padding: '10px', margin: '15px', width: '100%', fontSize: '1.2em', backgroundColor: '#202c34', borderRadius: '16px' }}>
    
    <table style={{    width: '100%' }}>
        <tr>
        <th style = {{textAlign: 'left', width: '40%', borderBottom: '1px', borderColor: 'white'}}>Player</th>
        <th style = {{textAlign: 'center'}}>Profit</th> 
        <th style = {{textAlign: 'center'}}>Games Played</th>
        <th style = {{textAlign: 'center'}}>Average Profit</th>
        <th style = {{textAlign: 'center'}}>Change</th>
        </tr>
            {playerData.map((player) => (
            <tr key={player[0]} style= {{borderBottom: '1px solid gray'}}>
            <td style = {{borderBottom: '1px', borderColor: 'white'}}><Link href={`/players/${player[0]}`}>{player[1]}</Link></td>
            <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{player[3]}</td>
            <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{player[2]}</td>
            <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{Math.floor(player[3] / player[2])}</td>
            <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{updatedPlace[player[4] - 1]}</td>
            </tr>))} 
        
        </table>  
    </div>
               

              
      );
}
      