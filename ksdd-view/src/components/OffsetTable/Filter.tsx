import { Input } from 'components/Input';

let fltMap = new Map<string, { key: string, value: string }>()

export const Filter = ({ setFilter }: {
  setFilter: (filter: { key: string, value: string }[]) => void
}) => {


  function search() {
    if (fltMap.size > 0) {
      let flt = [] as { key: string, value: string }[]
      fltMap.forEach(x => flt.push({key: x.key, value: x.value}))
      setFilter(flt)
    }
  }

  function clear() {
    fltMap.clear()
    setFilter([])
  }

  return (
    <>
      <div className={"btn btn-primary"} onClick={() => search()}>search</div>
      <div className={"btn btn-primary"} onClick={() => {
        clear();
        search()
      }}>clear
      </div>

      <form >
        <Input inputLabel={'Obj'} requestName={'objId'} fltMapRef={fltMap} />
      </form>
    </>
  )
}