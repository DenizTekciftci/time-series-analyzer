import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Dropdown({ value, setValue, options = null, label = "" }) {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                sx={{ p: 1 }}
                variant="standard"
                value={value}
                label={label}
                onChange={e => setValue(e)}
                InputLabelProps={{ shrink: false }}
            >
                {options && options.map((o) => (
                    <MenuItem key={o} value={o}>
                        {o}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}