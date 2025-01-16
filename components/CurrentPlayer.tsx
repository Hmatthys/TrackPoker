import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';





function averageProfit(gp: number, profit: number): number{
    return (Math.floor(profit / gp))
  }
  function graphProfit(profits: Array<number>): Array<number>{
    const out = [];
    let total = 0;
    for(let i = 0; i< profits.length; i++){
      total += profits[i];
      out.push(total);
    }
    return out
  }


export default async function Index( {data} : {data:any}) {
    const supabase = createClient();

    const YEAR = data.year
    const id = data.id


    const {data: player, error: playererror} = await supabase
        .from('player')
        .select()
        .eq('playerid', id)
        .single();

    if(playererror){
        return <p> player error</p>
    }


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

  
  const {data: results, error: resultserror} = await supabase
    .from('orderedresults')
    .select()
    .eq('playerid', id)
    .single();


  if(resultserror){
    return <p> results error</p>
  }
      
  

const {data: sessions, error: sessionerror} = await supabase
    .from('sessions')
    .select('game, profit')
    .eq('player', id)
    .gte('game', startGame)
    .lte('game', endGame);
    if(sessionerror){
      return <p>Session error</p>
    }

    if(results.latest_game < startGame){
        return <p> NO GAMES PLAYED THIS YEAR</p>
    }


    let yearProfit = 0;
    for(let i = 0; i < sessions.length; i++){
        yearProfit += sessions[i].profit;
    }


  
  
  


let gamesPlayedIn = new Array<number>;

let sessionProfit = new Array<number>;
sessions.map((session) => 
gamesPlayedIn.push(session.game)
);
sessions.map((session) =>
  sessionProfit.push(session.profit));

const cumProfit = graphProfit(sessionProfit);
let zeroLine = new Array<number>;
for(let i = 0; i < gamesPlayedIn.length; i++){
  zeroLine.push(0)
}
const chartData = {
      labels: gamesPlayedIn,
      datasets: [
          {
              label: 'Profit over time',
              data: cumProfit,
              fill: false,
              borderColor: 'orangered',
              tension: 0.4
                
          },
          {
              label: 'zero',
              data: zeroLine,
              borderColor: 'white',
              tension: 0
          }
      ]
  };
  const options = {
      legend: {
        display: false
      },
      tooltips: {
        enables: false
      },
      elements: {
        point:{
            radius: 0
        }
      }
  };


  if(sessions.length > 1){
    return (
    <div style={{ width: '100%', margin: '0 auto'}}>

      <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
        <h1>
          <p><u>{player.name}'s {2000 + YEAR} results</u>:</p>
          <br></br>
          <p>Number of sessions played: {sessions.length}</p>
          <p>Total profit: {yearProfit}</p>
          <p>Average profit: {Math.floor(yearProfit/sessions.length)}</p>
        </h1> 
        </div>
          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
            <table style={{ width: '100%' }}>
              <tr>
              <th style = {{textAlign: 'left', width: '65%', borderBottom: '1px', borderColor: 'white'}}>Game</th>
              <th style = {{textAlign: 'center'}}>Profit</th> 
              </tr>
              {sessions.map((sessions) =>(
                <tr key={sessions.game} style= {{borderBottom: '1px solid gray'}}>
                  <td><Link href={`/../../games/${sessions.game}`}>{sessions.game}</Link></td>
                  <td style = {{  textAlign: 'center' }}>{sessions.profit}</td> 
                </tr>
              ))}
            </table>
              
            
          </div>
        <div style = {{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px'}}>
          <Chart type="line" data={chartData} options={options} />
        </div>
        <div style = {{  width: '100%' }}>
          <p style = {{ textAlign: 'center' }}>
            <u><a href={'/../..'}>Home</a></u>
          </p>
          
        </div>
        
      </div>
    
  );
  }
  return(
    <div style={{ width: '100%', margin: '0 auto'}}>

    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
      <h1>
        <p><u>{player.name}'s {2000 + YEAR} results</u>:</p>
        <br></br>
        <p>Number of sessions played: {sessions.length}</p>
        <p>Total profit: {yearProfit}</p>
        <p>Average profit: {Math.floor(yearProfit/sessions.length)}</p>
      </h1> 
      </div>
        <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px'}}>
          <table style={{ width: '100%' }}>
            <tr>
            <th style = {{textAlign: 'left', width: '65%', borderBottom: '1px', borderColor: 'white'}}>Game</th>
            <th style = {{textAlign: 'center'}}>Profit</th> 
            </tr>
            {sessions.map((sessions) =>(
              <tr key={sessions.game} style= {{borderBottom: '1px solid gray'}}>
                <td><Link href={`/../../games/${sessions.game}`}>{sessions.game}</Link></td>
                <td style = {{  textAlign: 'center' }}>{sessions.profit}</td> 
              </tr>
            ))}
          </table>
            
          
        </div>
        
    <div style = {{  width: '100%' }}>
              <p style = {{ textAlign: 'center' }}>
                <u><a href={'/../..'}>Home</a></u>
              </p>
              
            </div>
            
          </div>
  );
  
}