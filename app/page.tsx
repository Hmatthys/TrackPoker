


import PlayerTable from "@/components/PlayerTable";
import GameTable from "@/components/GameTable";
import TotalChart from "@/components/TotalChart";
import { TabView, TabPanel } from 'primereact/tabview';
import React from 'react';



export default async function Index() {

 

      return (

          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem' }}>
            <TabView style={{display: 'flex', flexDirection: 'row'}}>
              <TabPanel header="Players" headerStyle={{marginLeft: '0.5rem', width: '15%',  backgroundColor: '#202c34', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', textAlign: 'center' }}>
                <PlayerTable />
              </TabPanel>
              <TabPanel header="Games" headerStyle={{marginLeft: '0.5rem',  width: '15%',  backgroundColor: '#202c34', textAlign: 'center' }}>
                <GameTable />
              </TabPanel>
              <TabPanel header="Chart" headerStyle={{ marginLeft: '0.5rem', width: '15%', backgroundColor: '#202c34', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', textAlign: 'center' }}>
                <TotalChart />
              </TabPanel>
            </TabView>
             
          </div>
      );
}
      