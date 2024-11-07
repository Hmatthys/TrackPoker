import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';









export default async function Player() {
  const supabase = createClient();

  

  
  
      
  

const {data: sessions, error: sessionerror, count: numsessions} = await supabase
  .from('sessions')
  .select('*', {count: 'exact', head: true});
  if(sessionerror){
    return <p>Session error</p>
  }

const {data: game, error: gameerror, count: numgames} = await supabase
  .from('game')
  .select('*', {count: 'exact', head: true});
  if(gameerror){
    return <p>game error</p>
  }



  

  return (
    <div style={{ width: '100%', margin: '0 auto'}}>

      
          <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem', backgroundColor: '#202c34', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
            <p>{numsessions}</p>
            <p>{numgames}</p>
    
          </div>
        
        <div style = {{  width: '100%' }}>
          <p style = {{ textAlign: 'center' }}>
            <u><a href={'/..'}>Home</a></u>
          </p>
          
        </div>
        
      </div>
    
  );
}
