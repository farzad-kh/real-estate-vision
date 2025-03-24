"use client"
import { Form, Skeleton } from 'antd';
import React from 'react';

const loading= () => {
    return (
        <section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full flex justify-center m-auto"
      >
 
        <Form
          className="max-sm:border-none   bg-[#fcfcfc]  border w-full max-w-[860px] !p-7 rounded"
         
          layout="vertical"
        >
          <div className="form_input mb-12">
          <Skeleton.Input block  active/>
          <Skeleton.Input block active/>
          
          
          </div>
          <div className="form_input mb-12">
          <Skeleton.Input block  active/>
          <Skeleton.Input block active/>
          <Skeleton.Input block active/>
          <Skeleton.Input className='overflow-hidden' block active/>
          
          
          </div>
          <div className="form_input mb-12">
          <Skeleton.Node  className='!h-[275px]  !w-full' active block fullSize />
          
          
          </div>
          <div className="form_input mb-12">
          <Skeleton.Input block  active/>
          <Skeleton.Input block active/>
          <Skeleton.Input block active/>
          <Skeleton.Input className='overflow-hidden' block active/>
          
          
          </div>
          <div className="form_input mb-12 justify-between">
          <Skeleton.Input  active/>
          <Skeleton.Input   active/>
          <Skeleton.Input   active/>
     
          
          
          </div>
          <div className="form_input mb-12  ">
         <Skeleton.Image active className='!w-32 !h-28'/>
         
     
          
          
          </div>
          <div className="form_input mb-12 justify-between">
          <Skeleton.Input  active/>
          <Skeleton.Input   active/>
          <Skeleton.Input   active/>
     
          
          
          </div>
         <div className='mt-16'>
         <Skeleton.Button className='max-md:w-full !w-40' size='large' />
         </div>
        </Form>
      </section>
    );
};

export default loading;