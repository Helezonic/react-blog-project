import { Controller } from "react-hook-form"
import { Editor } from "@tinymce/tinymce-react"
import { conf } from "../conf/conf"



export default function RTE({label, name, control, defaultValue=""}) {
    return (
        <>
            <div className="mb-3"> 
                {label && <label className='font-mono font-semibold md:my-2 my-1 md:text-xl text-lg text-yellow-300' htmlFor={label}>{label}</label>}
                
                <Controller
                name = {name || "content"}
                control = {control}
                render={(   {field : {onChange}}  ) => (
                    <Editor
                    apiKey={conf.tinymce_api}
                    initialValue={defaultValue}
                    init={{
                        initialValue: defaultValue,
                        height: 300,
                        menubar: false,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: 
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                    />
                )
                }
                /> 
            </div>
        </>
    )

}