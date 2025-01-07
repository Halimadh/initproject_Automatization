import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfigureServiceService } from 'src/app/services/configureProjectService/configure-service.service';

@Component({
  selector: 'app-generatorpdf',
  templateUrl: './generatorpdf.component.html',
  styleUrls: ['./generatorpdf.component.css']
})
export class GeneratorpdfComponent {
  nameProject:any;
  nameRepository:any;
  framework_back:any;
  framework_front:any;
  version_back:any;
  version_front:any;
  content:any;
  conten:any;
  body:any[]=[]
  

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: false,
      height: '15rem',
      minHeight: '5rem',
      width: 'auto',
      minWidth: '0',
      translate: 'no',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
       // enableToolbar: true,
      // showToolbar: true,
      // maxHeight: 'auto',
  }
  constructor( private router: Router,
    private route: ActivatedRoute,private cs:ConfigureServiceService){}

  formHome=new FormGroup({
    content:new FormControl(),
   
  })

  

  
  ngOnInit(): void {
    let vals =this.route.params.subscribe(params =>{
      this.nameProject=params["projectName"]
      this.nameRepository=params["repository"]
      this.framework_back=params["framework_back"]
      this.framework_front=params["framework_front"]
      this.version_back=params["version_back"]
      this.version_front=params["version_front"]
    })
    console.log(this.framework_back,this.framework_front,this.version_back,this.version_front)
    // this.cs.generatePdf(this.nameProject,this.nameRepository,this.framework_back,this.version_back,this.framework_back,
    //     this.version_front,_content).subscribe((response:any)=>{
    //       const data = `data:application/pdf;base64,${response.fileContents}`;
    //       var link = document.createElement('a');
    //       link.href = data;
    //       console.log(data)
    //       console.log(link.href)
           // console.log(response)
        // let newBlob = response.fileContents as Blob;
        // console.log(newBlob)
        // let url=window.URL.createObjectURL(newBlob);
        // window.open(url);
    //     },
    //     )
  }
 
  generatePdf(){
   var _content= this.formHome.value.content; 
    console.log(_content);
    for(let i=0;i<_content.length;i++){
       if(_content[i]!="\""){ 
          this.body[i]=_content[i]
       }else{
        this.body[i]='\\"'
       }
    }
    this.conten=this.body[0]
    for(let i=1;i<this.body.length;i++){
     this.conten= this.conten+this.body[i]
   }
   console.log(this.conten.toString())
    //  console.log()
    //  this.conten=this.body.map(x=>x.string)
    //  console.log(this.body.toString())
    // this.conten="<font color='#af2828'>DDDDDD</font>"
     
    this.cs.generatePdf(this.nameProject,this.nameRepository,this.framework_back,this.version_back,this.framework_front,
      this.version_front,_content).subscribe((response:any)=>{
      function  b64toBlob  (b64Data:any, contentType='', sliceSize=512){
          const byteCharacters = atob(b64Data);
          // const byteCharacters = Buffer.from(b64Data ,'base64')
          const byteArrays = [];
        
          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
        
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
        
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
        
          const blob = new Blob(byteArrays, {type: contentType});
          return blob;
        }
      const blob = b64toBlob(response.fileContents, "application/pdf");
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl)
     },)
   }
}
