import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PhotoDto } from 'src/app/models/photo-dto.interface';
import { PhotoService } from '../../services/photo.service';


const parametersMap = {
  'title': 'title',
  'albumTitle': 'album.title',
  'userEmail': 'album.user.email'
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public totalFound: number;
  public pageNumber: number = 1;
  public pageSize: number = 25;

  photos: Array<PhotoDto> = [];

  public photosFilterGroup = this.formBuilder.group({
		title: [''],
		albumTitle: [''],
		userEmail: ['']
	});


  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.search(1, 25);
  }

  public search(pageNumber: number, pageSize:number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;

    let params: Array<string> = [];
    
    for (let attribute in this.photosFilterGroup.controls) {
      let value = this.photosFilterGroup.get(attribute).value;
      if(value){
        params.push(`${parametersMap[attribute]}=${value}`);
      }
    }

    this.photoService.findPhotos(params, pageNumber, pageSize).then(
      res => {
        this.photos = res.content;
        this.totalFound = res.totalElements;
      }
    );
  }

  public pageEvent(event){
    this.search(event.pageIndex + 1, event.pageSize);
  }

}
