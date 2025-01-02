
import { createClient } from "@/utils/supabase/server";

import Link from 'next/link';
import React from 'react';




const YEAR = 25


function getYear(a: number): number{
  return Math.floor(a / 10000);
}
function getMonth(a: number): number{
  return (Math.floor(a / 100)) % 100;
}
function getDay(a: number): number{
  return a % 100
}




export default async function Index() {

  const supabase = createClient();
 


  const { data: games } = await supabase
    .from('game')
    .select();
    if(!games){
      return <p>No games</p>
    }

    const thisYear = games.filter((g) => (getYear(g.gamedate) == YEAR))
    // Make games in order of date, gets messed up sometimes
    thisYear.sort((a,b) => a.gamedate < b.gamedate ? -1 : a.gamedate > b.gamedate ? 1 : 0)

      return (
      
        <div style={{  padding: '10px', margin: '15px', width: '100%', fontSize: '1.2em', backgroundColor: '#202c34', borderRadius: '16px' }}>
        <table style={{    width: '100%' }}>
            <tr>
            <th style = {{textAlign: 'left', width: '70%', borderBottom: '1px', borderColor: 'white'}}>Date</th>
            <th style = {{textAlign: 'center'}}>Location</th> 
            
            </tr>
            
        
            {thisYear.map((games) => (
                <tr key={games.gameid} style= {{borderBottom: '1px solid gray'}}>
                    <td><Link href={`/games/${games.gameid}`}>{getMonth(games.gamedate)}/{getDay(games.gamedate)}/{getYear(games.gamedate)}</Link></td>
                    <td style = {{  textAlign: 'center' }}>{games.location}</td>
                </tr>))}
            
            </table>    
        </div> 
      );
}
      