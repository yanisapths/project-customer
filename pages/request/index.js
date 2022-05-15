import React,{useState , useEffect}  from 'react';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {useSession, getSession} from "next-auth/react";
import FooterSocial from '../../components/FooterSocial'
import Link from "next/link"
import { Controller,useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { collection, onSnapshot, orderBy, query ,where } from "@firebase/firestore";
import  { db } from "../../lib/firebase"
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';


function Request( ){ 
    const {data: session,status} = useSession();
    const { register, handleSubmit, watch, control, formState: { errors, isValid  } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });
    const onSubmit = data => console.log(data);
    const [member, setMember] = useState([]);
    const travel =[
        { id: 1, label: 'เดินทางไปเอง'},
        { id: 2, label: 'ศูนย์ดูแลรับ-ส่ง' },
        { id: 3, label: 'รับการดูแลที่บ้าน' },
    ];
    const services =[
        { id: 1, label: 'อาบน้ำ แต่งตัว'},
        { id: 2, label: 'อยู่เป็นเพื่อน ทำกิจกรรม' },
        { id: 3, label: 'ขับรถไปส่ง' },
        { id: 4, label: 'งานบ้าน' },
    ];
    
    useEffect(( ) => {
        if (status === "authenticated") {
            onSnapshot(
            query(collection(db, 'members'), where("name", "==" ,  session?.user.name ) , orderBy('timestamp', 'desc')) , 
            snapshot => {
                setMember(snapshot.docs)
            }
        ),[db]
      }
      else return <p>Loading...</p> ;
    });

    const handleChange = (event) => {
      setMember(event.target.value);
    };

    if (status === "loading") {
        return <p>Loading...</p>
      }
      

      if (status === "authenticated") {
          return (
            <div >
                <Head>
                    <title>Olive | Request </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
                <Header/>
                  <main className="main bg-teal-50 md:h-full overflow-hidden">
                            <div className="flex-grow pt-10  md:pt-30 mt-5   px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-white rounded-md ">
                                <div className="max-w-lg mx-auto text-center pb-8 ">
                                    <h1 className="font-bold  text-3xl text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">สร้างนัดดูแล</h1>
                                </div>
                                <form className="max-w-md mx-auto mt-8 mb-0 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="relative">
                                    <Grid item xs={6} md={8} className="pb-8">
                                                <FormControl sx={{ width: '100%',}} variant="outlined" required>
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <InputLabel id="demo-simple-select-label">เลือกบุคคลรับการดูแล</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={value || session.user.name}
                                                                        label="เลือกบุคคลรับการดูแล"
                                                                        onChange={onChange}
                                                                    >
                                                                    <MenuItem   value={`${session.user.name}`}>
                                                                         {session.user.name}
                                                                    </MenuItem>
                                                                     {member.map((input , key) => 
                                                                                <MenuItem 
                                                                                          key={input.id}
                                                                                        value={`${input.data().firstname}-${input.data().lastname}}`}
                                                                                >
                                                                                   {input.data().firstname}  {input.data().lastname} 
                                                                                </MenuItem>
                                                                    )}
                                                                    </Select>
                                                            </>
                                                                )}
                                                                name="member"
                                                                control={control}
                                                                />
                                                </FormControl>
                                            </Grid>
                                        <Grid item xs={6} md={12}  className="pb-8">
                                         <FormControl sx={{ width: '100%',}} variant="outlined" required>
                                                <Stack spacing={2} sx={{ width: '100%' }}>
                                                      <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                            <Autocomplete
                                                                    multiple
                                                                    id="size-small-standard-multi"
                                                                    size="string"
                                                                    options={services}
                                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                                    getOptionLabel={(option) => option.label}
                                                                    defaultValue={[services[3]]}
                                                                    renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        variant="standard"
                                                                        label="บริการที่ต้องการ"
                                                                        placeholder="เลือกบริการที่ต้องการ"
                                                                    />
                                                                    )}
                                                                />
                                                              </>
                                                                )}
                                                                name="services"
                                                                control={control}
                                                                />
                                                                </Stack>
                                                </FormControl>
                                           
                                            </Grid>
                                            <Grid item xs={6} md={8} className="pb-8">
                                                <FormControl sx={{ width: '100%',}} variant="outlined" required>
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <InputLabel id="demo-simple-select-label">การเดินทาง</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={value || ''}
                                                                        label="การเดินทาง"
                                                                        onChange={onChange}
                                                                    >
                                                                     {travel.map((input , key) => 
                                                                                <MenuItem 
                                                                                          key={input.id}
                                                                                            value={input.label}
                                                                                >
                                                                                  {input.label}
                                                                                </MenuItem>
                                                                    )}
                                                                    </Select>
                                                            </>
                                                                )}
                                                                name="travel"
                                                                control={control}
                                                                />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={12}  className="pb-8">
                                                <InputLabel shrink  style={{ fontSize: '24px'}}>บอกการดูแลที่เน้นเป็นพิเศษ</InputLabel>
                                                    <FormControl sx={{ width: '100%',}} variant="standard">
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <TextField
                                                                        id="outlined-textarea"
                                                                        placeholder="เช่น ดูแลผู้ป่วยแขนหัก"
                                                                        value={value || undefined}
                                                                        onChange={onChange} 
                                                                        multiline
                                                                />
                                                            </>
                                                                )}
                                                                name="description"
                                                                control={control}
                                                                rules={{
                                                                    required: false
                                                                }
                                                                }
                                                                />
                                                    </FormControl>
                                            </Grid>
                                    </div>
                                    <div className="relative text-center">
                                        <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg" disabled={!isValid}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                  <FooterSocial />
                  </main>
                  <Footer />
            </div>
        )

      }
      else{
        return (
            <div className="h-screen bg-teal-50">
                <Head>
                    <title>Olive | Family </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
            <Header/>
              <main className="main">
                  <section className="flex max-w-screen-xl px-4 py-10  mx-auto  lg:items-center lg:flex">
                             <div className="max-w-xl text-center sm:text-left ">
                                 <h1 className="mt-5 mb-2   text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                                     สร้างนัดดูแล
                                 </h1>
                                        <h1 className="mt-5 mb-2   text-3xl font-extrabold text-black sm:text-5xl bg-clip-text">
                                            Coming Soon
                                        </h1>
                                        <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
                                            This feature is under construction.
                                        </p>
                                <div  className="md:mt-16 mt-8  mb-0 space-y-4 border-t  border-black/25 md:pt-12 pt-8 ">
                                    <Link href="/auth/signin">
                                            <a  className=" mt-4 inline-block px-8 py-5  md:px-20 md:py-8 md:font-extrabold md:text-2xl  text-lg font-medium text-white transition bg-indigo-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring" >เข้าสู่ระบบ</a>
                                    </Link>
                                </div>
                            </div>
                  </section>
              </main>
              <Footer />
        </div>
        )
      }
}

export default Request;



