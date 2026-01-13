import {useEffect,useState} from 'react';
import api from '../api/client';

export default function Projects(){
  const [d,setD]=useState([]);
  useEffect(()=>{api.get('/projects').then(r=>setD(r.data));},[]);
  return <section><h2>Projects</h2>{d.map((p,i)=><p key={i}>{p.title}</p>)}</section>;
}
