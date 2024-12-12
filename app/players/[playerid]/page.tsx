import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';


import LegacyPlayer from "@/components/LegacyPlayer";
import CurrentPlayer from "@/components/CurrentPlayer";








export default async function Player({ params: { playerid } }: { params: { playerid: string } }) {
  
  return (
    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
      <TabView>
        <TabPanel header="Current">
            <CurrentPlayer id = { playerid }/>
        </TabPanel>
        <TabPanel header="All-Time">
            <LegacyPlayer id = { playerid }/>
        </TabPanel>
      </TabView>
    
    
    </div>
  )
}
