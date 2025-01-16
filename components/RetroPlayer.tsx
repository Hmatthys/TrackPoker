
import { createClient } from "@/utils/supabase/server";

import Link from 'next/link';
import React from 'react';


// DONT NEED TO CALCULATE CHANGE ON A NON ALL TIME NON CURRENT YEAR STAT PAGE

export default async function Index( {year} : {year:number} ) {

      const supabase = createClient();

      const YEAR = year

      const {data: games, error: gameserror} = await supabase
            .from('game')
            .select()
            .gt('gamedate', YEAR * 10000)
            .lt('gamedate', (YEAR + 1) * 10000)
        if(gameserror){
            return <p>Games error</p>
        }
        
        // Find the gameid of the first game of the year, all gameids after this will be of current year
        games.sort((a,b) => a.gamedate < b.gamedate ? -1 : a.gamedate > b.gamedate ? 1 : 0)

        const startGame = games[0].gameid
        const endGame = games[games.length - 1].gameid



      const { data: player } = await supabase
      .from('orderedresults')
      .select('playerid, name');


      if(!player){
        return <p>No players</p>
      }

   
      let playerData = new Array<[number, string, number, number, number]>; // ID NAME NUM_GAMES PROFIT CHANGE
     for(let i = 0; i < player.length; i++){
        let {data: playerSessions, error: sessionerror} = await supabase
          .from('sessions')
          .select('profit')
          .eq('player', player[i].playerid)
          .gte('game', startGame)
          .lte('game', endGame);

        if(sessionerror){
          return <p>Session Error</p>
        }
        if(!playerSessions || playerSessions.length < 1){
          continue
        }
        let profitSum = 0;
        for(let j = 0; j < playerSessions.length; j++){
          profitSum += playerSessions[j].profit;
        }
        playerData.push([player[i].playerid, player[i].name, playerSessions.length, profitSum,  50])

     }

     
     playerData.sort((a, b) => a[3] > b[3] ? -1 : a[3] < b[3] ? 1 : 0)

    
     

    

   
      

          return (     
        <div style={{  padding: '10px', margin: '15px', width: '100%', fontSize: '1.2em', backgroundColor: '#202c34', borderRadius: '16px' }}>
        
        <table style={{    width: '100%' }}>
            <tr>
            <th style = {{textAlign: 'left', width: '40%', borderBottom: '1px', borderColor: 'white'}}>Player</th>
            <th style = {{textAlign: 'center'}}>Profit</th> 
            <th style = {{textAlign: 'center'}}>Games Played</th>
            <th style = {{textAlign: 'center'}}>Average Profit</th>
            </tr>
                {playerData.map((player) => (
                <tr key={player[0]} style= {{borderBottom: '1px solid gray'}}>
                <td style = {{borderBottom: '1px', borderColor: 'white'}}><Link href={`/players/${player[0]}`}>{player[1]}</Link></td>
                <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{player[3]}</td>
                <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{player[2]}</td>
                <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{Math.floor(player[3] / player[2])}</td>
                </tr>))} 
            
            </table>  
        </div>
                  

                  
          );
}
      