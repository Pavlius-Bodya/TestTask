import { useAppSelector} from "../store/store"

export const Header = () => {
    const { exchange } = useAppSelector((state) => state.data)
    return (
    <>
        <h1 className='header-title'>
            Курс валют         
        </h1>
        <div className='header'>
            <div className='container'>
          {exchange && exchange.map((item,index) =>
              <div className='container-header' key={index}>
                  <div className='currency-text'>{item.ccy}/{item.base_ccy}</div>
                  <div className='currency-text' >{parseFloat(item.buy!).toFixed(2)}/{parseFloat(item.sale!).toFixed(2)}</div>
              </div>          
            )}
            </div>
        </div>
    </>
  )
}
