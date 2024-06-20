


import PlayerTable from "@/components/PlayerTable";
import GameTable from "@/components/GameTable";
import TotalChart from "@/components/TotalChart";
import { TabView, TabPanel } from 'primereact/tabview';
import React from 'react';



export default async function Index() {

 

      return (

          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
            <TabView>
              <TabPanel header="Players" headerStyle={{   flex: '1', backgroundColor: '#202c34' }}>
                <PlayerTable />
              </TabPanel>
              <TabPanel header="Games" headerStyle={{   flex: '1', margin: '15px', backgroundColor: '#202c34' }}>
                <GameTable />
              </TabPanel>
              <TabPanel header="Chart" headerStyle={{  flex: '1', margin: '15px', backgroundColor: '#202c34' }}>
                <TotalChart />
              </TabPanel>
            </TabView>
             
          </div>
      );
}
      