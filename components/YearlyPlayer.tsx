
import { createClient } from "@/utils/supabase/server";

import Link from 'next/link';
import React from 'react';
import Player from "@/app/players/[playerid]/page";

function returnChange(a: number): string{
  if(a > 0){
    return ('↑ ' + a)
  }
  if(a < 0){
    return ('↓ ' + Math.abs(a))
  }
  return '-'
}
const YEAR = 25


export default async function Index() {

      const supabase = createClient();
    

      const {data: games, error: gameserror} = await supabase
            .from('game')
            .select()
            .gt('gamedate', YEAR * 10000)
        if(gameserror){
            return <p>Games error</p>
        }
        
        // Find the gameid of the first game of the year, all gameids after this will be of current year
        games.sort((a,b) => a.gamedate < b.gamedate ? -1 : a.gamedate > b.gamedate ? 1 : 0)

        const startGame = games[0].gameid



      const { data: player } = await supabase
      .from('orderedresults')
      .select('playerid, name')
      .gte('latest_game', startGame);


      if(!player){
        return <p>No players</p>
      }

      let profits = Array<number>(player.length).fill(0);
      let playerData = new Array<[number, string, number, number, number]>; // ID NAME NUM_GAMES PROFIT CHANGE
     for(let i = 0; i < player.length; i++){
        let {data: playerSessions, error: sessionerror} = await supabase
          .from('sessions')
          .select('profit')
          .eq('player', player[i].playerid)
          .gte('game', startGame);

        if(sessionerror){
          return <p>Session Error</p>
        }
        if(!playerSessions){
          return <p>session error</p>
        }
        let profitSum = 0;
        for(let j = 0; j < playerSessions.length; j++){
          profitSum += playerSessions[j].profit;
        }
        playerData.push([player[i].playerid, player[i].name, playerSessions.length, profitSum,  50])

     }

     
     playerData.sort((a, b) => a[3] > b[3] ? -1 : a[3] < b[3] ? 1 : 0)

     let places = new Array<[number, number, number, number]>; // ID PROFIT CURRENT-PLACE LAST-WEEK-PLACE

     for(let i = 0; i < playerData.length; i++){
      places.push([0,0,0,0])
      
     }
     for(let i = 0; i < playerData.length; i++){
      places[i] = [playerData[i][0], playerData[i][3], i, 0 ]
     }

     const {data: game, error: gameerror, count: numgames} = await supabase
        .from('game')
        .select('*', {count: 'exact', head: true})
        if(gameerror){
            return <p>Count error</p>
        }
        if(!numgames){
          return <p> counting error</p>
        }

    const {data: lastGameSessions, error: lastgameerror} = await supabase
        .from('sessions')
        .select('player, profit')
        .eq('game', numgames)
      if(lastgameerror){
        return <p> last game error</p>
      }
      for(let j = 0; j< lastGameSessions.length; j++){
            for(let k = 0; k < places.length; k++){
              if (places[k][0] == lastGameSessions[j].player){
                places[k][1] -= lastGameSessions[j].profit
              }
            }
      }
      places.sort((a,b) => b[1] - a[1]);
      

      for(let i = 0; i < places.length; i++){
        playerData[places[i][2]][4] = i - places[i][2];
      }


      
      // const {data: game, error: gameerror, count: numgames} = await supabase
      //       .from('game')
      //       .select('*', {count: 'exact', head: true})
      //       if(gameerror){
      //           return <p>Count error</p>
      //       }
    


      // const { data: lastGame } = await supabase
      //   .from('sessions')
      //   .select('player, game, profit')
      //   .eq('game', numgames);

      // if(!lastGame){
      //   return <p>Last game error</p>
      // }
        
        
        // let currentPlace =  new Array<[number, number, number]>;
        // for (let i = 0; i < numplayers; i++){
        //   currentPlace.push([0,0,0])
        // }
        // let count = 1;
        
        // player.map((e) => {
        //     playerData.push([e.playerid, e.name, e.number_of_sessions, e.profit, count]);
        //     currentPlace[e.playerid - 1][0] = count;
        //     currentPlace[e.playerid - 1][2] = e.profit;
        //     count += 1;
        // })
        
        // lastGame.map((e) => 
        //   currentPlace[e.player - 1][2] -= e.profit
        // )
        // currentPlace.sort((a, b) => b[2] - a[2])
        // count = 0
        // currentPlace.map((e) => {
        //     currentPlace[count][1] = count + 1;
        //     count += 1;
        // })
        // let updatedPlace =  new Array<number>
        // for(let i = 0; i < numplayers; i++){
        //   updatedPlace.push(0)
        // }
        // count = 0
        // currentPlace.map((e) => 
        //   updatedPlace[e[0] - 1] = e[1] - e[0] 
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
                <td style = {{textAlign: 'center', borderBottom: '1px', borderColor: 'white'}}>{returnChange(player[4])}</td>
                </tr>))} 
            
            </table>  
        </div>
                  

                  
          );
}
      