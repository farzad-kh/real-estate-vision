import { Button } from 'antd';
 

const RoomFilterBtn = ({ value, hasFiltersChanged, filterHandler, clearParamHandler}) => {
     
 
    return (
        <div className="flex justify-between">
          <Button onClick={()=>clearParamHandler()} disabled={value === 1} type="default">
            Clear
          </Button>
          <Button
            type="primary"
            disabled={!hasFiltersChanged}
            onClick={filterHandler}
          >
            Apply
          </Button>
        </div>
      );
 
};

 
export default RoomFilterBtn;