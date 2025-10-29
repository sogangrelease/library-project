package com.release.library.book;

import com.release.library.borrow.Borrow;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "book",
        indexes = @Index(name = "ix_book_category", columnList = "category"))
public class Book {

    @Id
    @Column(name = "book_id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "title_main", nullable = false, length = 300)
    private String titleMain;

    @Column(name = "category", length = 100)
    private String category;

    @Column(name = "language", length = 100)
    private String language;

    @Column(name="description",length = 500)
    private String description;

    @Column(name="index",length = 300)
    private String index;

    @Column(name="author",length = 100)
    private String author;


    @OneToOne(mappedBy = "book", fetch = FetchType.LAZY, optional = true)
    private Borrow borrow;

    @Transient
    public boolean isLoaned() {
        return borrow != null;
    }


}
