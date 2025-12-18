import Select from 'react-select'

export default function AddToGroup({myGroups, addedtoGroup, setAddedtoGroup}){

    const Options = myGroups?.map((group) => ({
        value: group.group_id,
        label: group.group_name
    }))

    const chooseGroup = (grp) => {
        setAddedtoGroup(grp.value)
        console.log(addedtoGroup)
    }
    
    return(
        <Select
        options={Options}
        className="group"
        classNamePrefix='select'
        onChange={chooseGroup}
        theme={(theme) => ({
            ...theme,
                borderRadius: 0,
                border: '1px dotted #a5e364',
                color: '#F5F5F5',
                display: 'flex',
            colors: {
                ...theme.colors,
                primary: '#585cd5',
                primary25: '#7c80de',
                neutral0: '#F5F5F5',
            },
        })}
        styles={{
            singleValue: (baseStyles) => ({
                ...baseStyles,
                color: '#F5F5F5'
            }),
            valueContainer: (baseStyles) => ({
                ...baseStyles,
                display: 'flex',
                padding: '4px 8px'
            }),
            container: (baseStyles) => ({
                ...baseStyles,
                padding: '5px'
            }),
            menu: (baseStyles) => ({
                ...baseStyles,
                top: 'auto'
            }),
            inputContainer: (baseStyles) => ({
                ...baseStyles,
                paddingTop: '3px',
                paddingBottom: '3px'
            })
        }}
        />
    )
}