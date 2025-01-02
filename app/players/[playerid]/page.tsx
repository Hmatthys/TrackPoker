import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';


import LegacyPlayer from "@/components/LegacyPlayer";
import CurrentPlayer from "@/components/CurrentPlayer";





const YEAR = 25


export default async function Player({ params: { playerid } }: { params: { playerid: string } }) {
  const supabase = createClient();

  const {data: games, error: gameserror} = await supabase
    .from('game')
    .select()
    .gt('gamedate', YEAR * 10000);
    if(gameserror){
        return <p>Games error</p>
    }
    if(games.length == 0){
      return <LegacyPlayer id = { playerid }/> // If no games exist this year just return all time
    }
// Find the gameid of the first game of the year, all gameids after this will be of current year
    games.sort((a,b) => a.gamedate < b.gamedate ? -1 : a.gamedate > b.gamedate ? 1 : 0)

    const startGame = games[0].gameid


  const {data: results, error: resultserror} = await supabase
    .from('orderedresults')
    .select()
    .eq('playerid', playerid)
    .single();


  if(resultserror){
    return <p> results error</p>
  }
      
  

const {data: sessions, error: sessionerror} = await supabase
    .from('sessions')
    .select('game, profit')
    .eq('player', playerid)
    .gte('game', startGame);
    if(sessionerror){
      return <p>Session error</p>
    }

    if(results.latest_game < startGame){
        return <LegacyPlayer id = { playerid }/> // IF NO GAMES PLAYED THIS YEAR JUST RETURN ALL TIME STATS
    }
  
  return (
    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
      <TabView>
        <TabPanel header={`♤ ${2000 + YEAR}`} headerStyle={{marginLeft: '0.5rem', width: '20%',  backgroundColor: '#202c34', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', textAlign: 'center' }}>
            <CurrentPlayer id = { playerid }/>
        </TabPanel>
        <TabPanel header="♢ All-Time" headerStyle={{ marginLeft: '0.5rem', width: '20%',  backgroundColor: '#202c34', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', textAlign: 'center' }}>
            <LegacyPlayer id = { playerid }/>
        </TabPanel>
      </TabView>
    
    
    </div>
  )
}
