import React, {useMemo, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright';
import { StyledBorder } from '../../../components/shared';
import ActionOverlay from './ActionOverlay';
import { Toolchain } from './ToolchainDropdown';
import { useThemeContext } from '../../../context/theme';

export interface SwayEditorProps {
  code: string;
  onChange: (value: string) => void;
  toolchain: Toolchain;
  setToolchain: (toolchain: Toolchain) => void;
}

function SwayEditor({
  code,
  onChange,
  toolchain,
  setToolchain,
}: SwayEditorProps) {
  //set theme of editor once theme changes
  const [themeStyle,setThemeStyle] = useState('chrome')
  const theme = useThemeContext().theme;
  useMemo(()=>{
    if(theme !== 'light'){
      setThemeStyle('tomorrow_night_bright')
    } else{
      setThemeStyle('chrome')
    }
  }, [theme])
  
  return (
    <StyledBorder style={{ flex: 1 }}>
      <ActionOverlay
        handleSelectExample={onChange}
        toolchain={toolchain}
        setToolchain={setToolchain}
        editorLanguage='sway'
      />
      <AceEditor
        style={{
          width: '100%',
          height: '100%',
        }}
        mode='rust'
        theme={themeStyle}
        name='editor'
        fontSize='14px'
        onChange={onChange}
        value={code}
        editorProps={{ $blockScrolling: true }}
      />
    </StyledBorder>
  );
}

export default SwayEditor;
