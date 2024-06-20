


import PlayerTable from "@/components/PlayerTable";
import GameTable from "@/components/GameTable";
import TotalChart from "@/components/TotalChart";
import { TabView, TabPanel } from 'primereact/tabview';
import React from 'react';
import 'globals.css';


export default async function Index() {

 

      return (

          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
            <TabView style = {{width: '33%'}}>
              <TabPanel header="Players">
                <PlayerTable />
              </TabPanel>
              <TabPanel header="Games">
                <GameTable />
              </TabPanel>
              <TabPanel header="Chart">
                <TotalChart />
              </TabPanel>
            </TabView>
             
          </div>
      );
}
      