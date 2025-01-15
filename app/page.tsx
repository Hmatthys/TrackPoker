


import PlayerTable from "@/components/PlayerTable";
import GameTable from "@/components/GameTable";
import TotalChart from "@/components/TotalChart";
import YearlyGame from "@/components/YearlyGame";
import YearlyChart from "@/components/YearlyChart";
import YearlyPlayer from "@/components/YearlyPlayer";
import Legacy from "@/components/Legacy";
import Yearly from "@/components/Yearly";
import { TabView, TabPanel } from 'primereact/tabview';
import React from 'react';
import "globals.css";



export default async function Index() {
    
 

      return (
          <body>

          
          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>
            <TabView>
              {/* <TabPanel header="♤   Players" headerStyle={{marginLeft: '0.5rem', width: '30%',  backgroundColor: '#202c34', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', textAlign: 'center' }}>
                <YearlyPlayer />
              </TabPanel> */}
              <TabPanel header="♧   2025" headerStyle={{marginLeft: '0.5rem',  width: '30%',  backgroundColor: '#202c34', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', textAlign: 'center' }}>
                <Yearly year={25} />
              </TabPanel>
              <TabPanel header="♢   2024" headerStyle={{marginLeft: '0.5rem',  width: '30%',  backgroundColor: '#202c34', textAlign: 'center' }}>
                <Yearly year={24}/>
              </TabPanel>
              <TabPanel header="♡   All-Time" headerStyle={{ marginLeft: '0.5rem', width: '30%',  backgroundColor: '#202c34', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', textAlign: 'center' }}>
                <Legacy />
              </TabPanel>
            </TabView>
             
          </div>
          </body>
      );
}
      