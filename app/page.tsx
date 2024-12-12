


import PlayerTable from "@/components/PlayerTable";
import GameTable from "@/components/GameTable";
import TotalChart from "@/components/TotalChart";
import YearlyGame from "@/components/YearlyGame";
import YearlyChart from "@/components/YearlyChart";
import YearlyPlayer from "@/components/YearlyPlayer";
import Legacy from "@/components/Legacy";
import { TabView, TabPanel } from 'primereact/tabview';
import React from 'react';
import "./globals.css";



export default async function Index() {

 

      return (

          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
            <TabView style={{}}>
              <TabPanel header="♠   Players" headerStyle={{marginLeft: '0.5rem', width: '20%',  backgroundColor: '#202c34', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', textAlign: 'center' }}>
                <PlayerTable />
              </TabPanel>
              <TabPanel header="♣   Games" headerStyle={{marginLeft: '0.5rem',  width: '20%',  backgroundColor: '#202c34', textAlign: 'center' }}>
                <YearlyGame />
              </TabPanel>
              <TabPanel header="♦   Chart" headerStyle={{marginLeft: '0.5rem',  width: '20%',  backgroundColor: '#202c34', textAlign: 'center' }}>
                <YearlyChart />
              </TabPanel>
              <TabPanel header="♥   All-Time" headerStyle={{ marginLeft: '0.5rem', width: '20%',  backgroundColor: '#202c34', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', textAlign: 'center' }}>
                <Legacy />
              </TabPanel>
            </TabView>
             
          </div>
      );
}
      