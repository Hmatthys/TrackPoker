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


export default async function Index({id} : {id:string} ) {
    const supabase = createClient();

  

  
  
      
  

const {data: sessions, error: sessionerror} = await supabase
    .from('sessions')
    .select('game, profit')
    .eq('player', id);
    if(sessionerror){
      return <p>Session error</p>
    }

  const { data: player, error: playererror } = await supabase
  .from('player')
  .select('name')
  .eq( 'playerid', id )
  .single();
  if(playererror){
    return <p>player error</p>
  };
  
  
  
  const { data: results, error: resultserror} = await supabase
    .from('results')
    .select()
    .eq('name', player.name);
    if(resultserror){
      return <p>results error</p>
    }
  const playerResults = results[0];

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
            <p><u>{playerResults.name}'s overall results</u>:</p>
            <br></br>
            <p>Number of sessions played: {playerResults.number_of_sessions}</p>
            <p>Total profit: {playerResults.profit}</p>
            <p>Average profit: {averageProfit(playerResults.number_of_sessions, playerResults.profit)}</p>
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

  return (
    <div style={{ width: '100%', margin: '0 auto'}}>

      <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
        <h1>
          <p><u>{playerResults.name}'s overall results</u>:</p>
          <br></br>
          <p>Number of sessions played: {playerResults.number_of_sessions}</p>
          <p>Total profit: {playerResults.profit}</p>
          <p>Average profit: {averageProfit(playerResults.number_of_sessions, playerResults.profit)}</p>
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