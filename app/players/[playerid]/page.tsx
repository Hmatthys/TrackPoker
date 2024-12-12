import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';


import LegacyPlayer from "@/components/LegacyPlayer";
import CurrentPlayer from "@/components/CurrentPlayer";





const YEAR = 25


export default async function Player({ params: { playerid } }: { params: { playerid: string } }) {
  
  return (
    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
      <TabView>
        <TabPanel header={2000 + YEAR} headerStyle={{marginLeft: '0.5rem', width: '20%',  backgroundColor: '#202c34', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', textAlign: 'center' }}>
            <CurrentPlayer id = { playerid }/>
        </TabPanel>
        <TabPanel header="All-Time" headerStyle={{ marginLeft: '0.5rem', width: '20%',  backgroundColor: '#202c34', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', textAlign: 'center' }}>
            <LegacyPlayer id = { playerid }/>
        </TabPanel>
      </TabView>
    
    
    </div>
  )
}
