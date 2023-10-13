import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/services/header.service';
import { CommentService } from 'src/app/services/comment.service';
import { BannerService } from 'src/app/services/banner.service';
import { PartnerService } from 'src/app/services/partner.service';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit{
  title: string = ''

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService,
    private HeaderService: HeaderService,
    private CommentService: CommentService,
    private BannerService: BannerService,
    private PartnerService: PartnerService,
    private AccountService: AccountService,
    private ProductService: ProductService,
    private QuestionService: QuestionService
  ) {}

  ngOnInit(): void {

  }

  deleteItem(id: any, title: string) {
    switch (title) {
      case 'Header' : {
        this.HeaderService.deleteHeader(id).subscribe({
          next: res => {
            this.toast.success(res, 'Successfully')
            this.dialogRef.close();
          },
          error: err => {
            console.log(err)
            this.toast.error(err, 'Unsuccessfully')
            this.dialogRef.close();
          }
        });
        break
      }
      case 'Bình luận': {
        this.CommentService.deleteComment(id).subscribe({
          next: res => {
            this.toast.success(res, 'Successfully')
            this.dialogRef.close();
          },
          error: err => {
            console.log(err)
            this.toast.error(err, 'Unsuccessfully')
            this.dialogRef.close();
          }
        });
        break
      }
      case 'Banner': {
        this.BannerService.deleteBanner(id).subscribe({
          next: res => {
            this.toast.success('Xóa banner thành công', 'Successfully')
            this.dialogRef.close();
          },
          error: err => {
            this.toast.error('Xóa banner không thành công', 'Unsuccessfully')
            this.dialogRef.close();
          }
        });
        break
      }
      case 'Đối tác':
      case 'Khách hàng': {
        this.PartnerService.deleteData(id).subscribe({
          next: data => {
            this.toast.success("Xóa thành công", "Successfully")
            this.dialogRef.close()
          },
          error: err => {
            this.toast.error("Xóa không thành công", "Unsuccessfully")
            this.dialogRef.close()
          }
        })
        break
      }
      case 'Tài khoản': {
        this.AccountService.deleteData(id).subscribe({
          next: data => {
            this.toast.success("Xóa thành công", "Successfully")
            this.dialogRef.close()
          },
          error: err => {
            console.log(err)
            this.toast.error("Xóa không thành công", "Unsuccessfully")
            this.dialogRef.close()
          }
        })
        break;
      }
      case 'Sản phẩm': {
        this.ProductService.deleteData(id).subscribe({
          next: data => {
            this.toast.success("Xóa thành công", "Successfully")
            this.dialogRef.close()
          },
          error: err => {
            this.toast.error("Xóa không thành công", "Unsuccessfully")
            this.dialogRef.close()
          }
        })
        break;
      }
      case 'Câu hỏi khách hàng': {
        this.QuestionService.deleteData(id).subscribe({
          next: data => {
            this.toast.success("Xóa thành công", "Successfully")
            this.dialogRef.close()
          },
          error: err => {
            this.toast.error("Xóa không thành công", "Unsuccessfully")
            this.dialogRef.close()
          }
        })
        break;
      }
      default: {
        console.log("Ko cos")
        break;
      }
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
