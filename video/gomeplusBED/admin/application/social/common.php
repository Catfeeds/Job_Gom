<?php
    //清空制定文件夹下的所有文件及文件夹
    function clearDir($dirName)
    {
        if(is_dir($dirName))
        {
            if($handle = opendir($dirName))
            {
                while(false !== ($item = readdir($handle)))
                {
                    if($item != "." && $item != "..")
                    {
                        if(is_dir($dirName.'/'.$item))
                        {
                            clearDir($dirName.'/'.$item);
                            rmdir($dirName.'/'.$item);
                        }
                        else
                        {
                            unlink($dirName.'/'.$item);
                        }
                    }
                }
                closedir( $handle );
            }
        }
    }